import {NextRequest, NextResponse} from "next/server";

// type RedirectEntry = {
//     destination: string
//     permanent: boolean
// }
export async function GET(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    console.log('debug',pathname)



    // Return the redirect entry
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`)
}