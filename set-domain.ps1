# Usage: .\set-domain.ps1 https://your-domain.com
param([Parameter(Mandatory=$true)][string]$Domain)
$Domain = $Domain.TrimEnd("/")
Get-ChildItem -Recurse -Include *.html,*.xml,*.txt | ForEach-Object {
  $c = Get-Content $_.FullName -Raw -Encoding UTF8
  if ($c -match "__SITE_URL__") { [IO.File]::WriteAllText($_.FullName, $c.Replace("__SITE_URL__", $Domain), (New-Object Text.UTF8Encoding $false)) }
}
Write-Host "Done: $Domain"
