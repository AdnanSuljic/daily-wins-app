import TitleXL from '../Title-XL/TitleXL'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <TitleXL title="Daily wins app" description="Write down your daily wins and see how much you've accomplished!" />
    </header>
  )
}