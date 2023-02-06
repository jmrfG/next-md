import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="nav p-3 border-bottom">
      <Link href="/" passHref>
        <h2 className="pointer">Jorge MR Farias</h2>
      </Link>

      <Link href="/math" passHref>
        <p className="ms-5 pointer my-auto">Mathematics</p>
      </Link>
      <Link href="/philosophy" passHref>
        <p className="ms-5 pointer my-auto">Philosophy</p>
      </Link>
    </nav>
  )
}

export default Nav