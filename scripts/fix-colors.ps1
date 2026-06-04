$files = @(
  'Process.tsx',
  'Pricing.tsx',
  'FAQ.tsx',
  'CtaBanner.tsx',
  'Contact.tsx',
  'Footer.tsx',
  'Services.tsx',
  'ServicesSummary.tsx',
  'DetailedServices.tsx',
  'MaintenancePricing.tsx',
  'TechStack.tsx'
)

$basePath = 'c:\Users\diego\Desktop\agencia\src\components\landing'

foreach ($f in $files) {
  $path = Join-Path $basePath $f
  if (Test-Path $path) {
    $content = Get-Content $path -Raw

    # Replace text-white with text-[var(--text)] for content text
    # But NOT inside button classes (btn-primary already has color:white in CSS)
    $content = $content -replace '\btext-white\b', 'text-[var(--text)]'

    # shadow-black adjustments
    $content = $content -replace 'shadow-black\b', 'shadow-black/20 dark:shadow-black/50'

    # hover:shadow-black
    $content = $content -replace 'hover:shadow-2xl hover:shadow-black/20 dark:shadow-black/50\b', 'hover:shadow-2xl'

    Set-Content $path $content -NoNewline
    Write-Host "Updated text-white: $f"
  }
}

# Also fix PageHeader
$pageHeaderPath = 'c:\Users\diego\Desktop\agencia\src\components\shared\PageHeader.tsx'
if (Test-Path $pageHeaderPath) {
  $content = Get-Content $pageHeaderPath -Raw
  $content = $content -replace 'bg-\[#050505\]', 'bg-[var(--bg)]'
  $content = $content -replace 'bg-\[#0A0A0A\]', 'bg-[var(--bg-secondary)]'
  $content = $content -replace 'border-\[#222\]', 'border-[var(--border)]'
  $content = $content -replace 'text-\[#888\]', 'text-[var(--text-secondary)]'
  $content = $content -replace 'text-\[#666\]', 'text-[var(--text-tertiary)]'
  $content = $content -replace '\btext-white\b', 'text-[var(--text)]'
  Set-Content $pageHeaderPath $content -NoNewline
  Write-Host "Updated: PageHeader.tsx"
}

Write-Host "`nDone!"
