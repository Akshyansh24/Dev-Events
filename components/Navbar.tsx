import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="Logo" width={24} height={24} />
          <p>Dev Event</p>
        </Link>
        <ul className="flex gap-3 items-center list-none">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/create-events">Create Event</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
