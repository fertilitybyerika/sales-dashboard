import './globals.css'

export const metadata = {
  title: 'Sales Dashboard',
  description: 'Track your sales performance',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
