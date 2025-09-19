// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function AdminPage({ children }) {
//   const { data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (session && session.user.role !== "admin") {
//       router.push("/"); // redirect non-admin users
//     }
//   }, [session]);

//   if (!session) return <p>Loading...</p>;
//   return <>{children}</>;
// }
