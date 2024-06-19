import { Link, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: () => <Home />,
})

const Home = () => (
  <div>
    <h1>Home</h1>
    <Link to="/upload">Upload</Link>
  </div>
)
