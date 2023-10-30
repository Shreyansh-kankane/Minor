// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";

// import { auth } from "app/firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";

// const authOptions = {
//     providers: [
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {},
//             async authorize(credentials) {
//                 const { email, password } = credentials;
//                 return await signInWithEmailAndPassword(auth, email, password)
//                     .then((res) => {
//                         return fetch('https://sihdashboardapi-chaitanyakanhar2004.b4a.run/login/', {
//                             method: "POST",
//                             body: JSON.stringify({ token: res._tokenResponse.idToken }),
//                             contentType: "application/json",
//                         })
//                         .then((res) => res.json())
//                         .then(data => {
//                             console.log("data: ",data);
//                             return data;
//                         })
//                     }).catch((err) => {
//                         console.log({ "error": err.message });
//                     }) || null;
//                 }
//             })
//     ],
//     session: {
//         strategy: 'jwt'
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: "/signin"
//     }
// }
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST }


import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });
                    if (!user) {
                        return null;
                    }
        
                    const passwordsMatch = await bcrypt.compare(password, user.password);
        
                    if (!passwordsMatch) {
                        return null;
                    }
                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin"
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user._id;
            }
            return token;
        },
        async session({session, token}) {
            session.user.id = token.id;
            return session;
        }
    }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



// try {
//   const res = await signInWithEmailAndPassword(auth, email, password);
//   const token = res._tokenResponse.idToken;
//   const apiResponse = await fetch('https://sihdashboardapi-chaitanyakanhar2004.b4a.run/login/', {
//     method: "POST",
//     body: JSON.stringify({ token }),
//     contentType: "application/json",
//   });

//   const data = await apiResponse.json();

//   if (!data.error) {

//     // Store the data in the session object
//     return {
//       ...data,
//     };
//   }
// } catch (err) {
//   console.error(err);
// }