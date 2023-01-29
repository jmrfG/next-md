import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="nav p-3 border-bottom">
      <Link href="/" passHref>
        <h2 className="pointer">Jorge MR Farias</h2>
      </Link>

      <Link href="/bio" passHref>
        <p className="ms-5 pointer my-auto">Bio</p>
      </Link>
    </nav>
  )
}

export default Nav