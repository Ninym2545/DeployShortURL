
import connect from "../../../../utils/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import Users from "@/models/user";

connect();

const handler = NextAuth (
  {
    providers: [

      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "email@gmail.com" , required: true },
          password: { label: "Password", type: "password" , required: true  }
        },
        async authorize(credentials, req) {
          const {email , password} = credentials;

          const user = await signInWithCredentials({email , password})
          
          return user;
        }
      })
    
    ],
    pages: {
      signIn: "/login",
      error: '/login',
    },
    callbacks: {
     
      async jwt({token, trigger , session}) {
        const user = await getUserByEmail({email : token.email})
        token.user = user;
        return token
      },
      async session({session, token}){
        session.user = token.user;
        return session
      }
    }
  
  }  
)
export { handler as GET, handler as POST };

/*----------------------------------*/

async function getUserByEmail({email}){
  const user = await Users.findOne({email}).select('-password')
  if(!user)
    throw new Error('Email does no exist!')
  return {...user._doc,_id: user._id.toString()}
}

async function signInWithCredentials({email , password}){

  const user = await Users.findOne({email})
  if(!user) throw new Error('Email does not exist!')

  const compare = await bcrypt.compare(password , user.password)
  if(!compare) throw new Error('Password does not match!')

  return {...user._doc,_id: user._id.toString()}
}