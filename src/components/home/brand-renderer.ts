import {
  ACESFilmicToneMapping, BufferAttribute, BufferGeometry, DirectionalLight,
  HemisphereLight, Mesh, MeshPhysicalMaterial, OrthographicCamera, Scene,
  SRGBColorSpace, WebGLRenderer,
} from "three";
import model from "./brand-model.json";

export interface BrandRenderer {
  setRunning: (value: boolean) => void;
  setTheme: (theme: "dark" | "light") => void;
  setFront: (value: boolean) => void;
  dispose: () => void;
}

export async function mountBrandRenderer(host: HTMLElement, signal: AbortSignal, onFailure: () => void): Promise<BrandRenderer> {
  const response = await fetch("/img/brand/pc-model.bin", { signal });
  if (!response.ok) throw new Error("Brand geometry could not be loaded");
  const binary = await response.arrayBuffer();
  if (signal.aborted) throw new DOMException("Aborted", "AbortError");
  if (binary.byteLength !== model.bytes) throw new Error("Invalid brand geometry");
  const geometry = new BufferGeometry();
  const positionBytes = model.vertices * 3 * 4;
  geometry.setAttribute("position", new BufferAttribute(new Float32Array(binary, 0, model.vertices * 3), 3));
  geometry.setAttribute("normal", new BufferAttribute(new Float32Array(binary, positionBytes, model.vertices * 3), 3));
  geometry.setIndex(new BufferAttribute(new Uint32Array(binary, positionBytes * 2, model.indices), 1));
  model.groups.forEach(group => geometry.addGroup(group.start, group.count, group.materialIndex));
  // Single mesh, two materials; both official contours and the P counter are
  // baked from the source SVG. No tracing, fonts, or runtime SVG conversion.
  const front = new MeshPhysicalMaterial({ color: "#d7c8e7", metalness: .32, roughness: .28, clearcoat: .45, clearcoatRoughness: .35 });
  const sides = new MeshPhysicalMaterial({ color: "#765091", metalness: .42, roughness: .32, clearcoat: .25 });
  const mesh = new Mesh(geometry, [front, sides]);
  const scene = new Scene();
  scene.add(mesh);
  const ambient = new HemisphereLight("#fff5ed", "#463052", 2.5);
  scene.add(ambient);
  const key = new DirectionalLight("#fff5ed", 3.2);
  key.position.set(-3, 5, 6);
  scene.add(key);
  const rim = new DirectionalLight("#c099f0", 3);
  rim.position.set(5, 1, -3);
  scene.add(rim);
  const fill = new DirectionalLight("#d3c4ef", 1.5);
  fill.position.set(3, -2, 4);
  scene.add(fill);
  const camera = new OrthographicCamera(-1.7, 1.7, 1.7, -1.7, .1, 30);
  camera.position.set(0, 0, 8);
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  let maxFps = window.matchMedia("(max-width: 900px)").matches ? 24 : 30;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  canvas.dataset.brandCanvas = "true";
  host.appendChild(canvas);
  let frame = 0, elapsed = 0, previous = 0, lastRender = 0;
  let running = false, frontal = false, disposed = false;
  let devicePixelRatio = window.devicePixelRatio || 1;
  const pose = () => {
    const angle = elapsed * Math.PI * 2 / 18 + Math.PI / 5;
    mesh.rotation.set(frontal ? 0 : .1 * Math.sin(angle), frontal ? 0 : .62 * Math.sin(angle), frontal ? 0 : .035 * Math.sin(angle));
    mesh.position.y = frontal ? 0 : .025 * Math.sin(angle);
  };
  const render = () => {
    if (disposed) return;
    pose();
    renderer.render(scene, camera);
  };
  const tick = (now: number) => {
    if (!running || disposed) return;
    // Cap drawing at 24 fps on mobile / 30 on desktop; no React frame updates.
    if (now - lastRender >= 1000 / maxFps) {
      elapsed += Math.min((now - previous) / 1000, .1);
      previous = lastRender = now;
      if (devicePixelRatio !== (window.devicePixelRatio || 1)) resize();
      else render();
    }
    frame = requestAnimationFrame(tick);
  };
  const setRunning = (value: boolean) => {
    if (running === value || disposed) return;
    running = value;
    canvas.dataset.motion = value ? "running" : "paused";
    cancelAnimationFrame(frame);
    if (value) { resize(); previous = lastRender = performance.now(); frame = requestAnimationFrame(tick); }
  };
  const resize = () => {
    if (disposed) return;
    maxFps = window.matchMedia("(max-width: 900px)").matches ? 24 : 30;
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    // Match Retina displays instead of stretching a DPR-1 buffer on mobile.
    // Bound GPU work by canvas area, independently of animation frame rate.
    devicePixelRatio = window.devicePixelRatio || 1;
    const pixelRatio = Math.min(devicePixelRatio, 3, Math.sqrt(1_440_000 / (width * height)));
    const aspect = width / height;
    camera.left = -1.7 * aspect;
    camera.right = 1.7 * aspect;
    camera.updateProjectionMatrix();
    renderer.setDrawingBufferSize(width, height, pixelRatio);
    render();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  let densityQuery: MediaQueryList;
  const onDensityChange = () => { watchDensity(); resize(); };
  const watchDensity = () => {
    densityQuery?.removeEventListener("change", onDensityChange);
    densityQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
    densityQuery.addEventListener("change", onDensityChange);
  };
  watchDensity();
  window.addEventListener("resize", resize);
  const onLost = (event: Event) => { event.preventDefault(); setRunning(false); onFailure(); };
  canvas.addEventListener("webglcontextlost", onLost);
  resize();
  return {
    setRunning,
    setTheme(theme) {
      front.color.set(theme === "dark" ? "#d7c8e7" : "#0b0b0c");
      sides.color.set(theme === "dark" ? "#765091" : "#060607");
      rim.color.set(theme === "dark" ? "#c099f0" : "#ffffff");
      fill.color.set(theme === "dark" ? "#d3c4ef" : "#ffffff");
      key.color.set(theme === "dark" ? "#fff5ed" : "#ffffff");
      ambient.color.set(theme === "dark" ? "#fff5ed" : "#ffffff");
      ambient.groundColor.set(theme === "dark" ? "#463052" : "#222222");
      render();
    },
    setFront(value) { frontal = value; render(); },
    dispose() {
      if (disposed) return;
      setRunning(false);
      disposed = true;
      observer.disconnect();
      densityQuery.removeEventListener("change", onDensityChange);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", onLost);
      geometry.dispose(); front.dispose(); sides.dispose(); renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
