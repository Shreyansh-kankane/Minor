import Link from "next/link";

function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Link href={'/signin'}>SignIn</Link>   
    </div>
  );
}

export default Home;
