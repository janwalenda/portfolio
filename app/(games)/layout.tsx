import "../globals.css"

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-base-100">{children}</body>
    </html>
  )
}
