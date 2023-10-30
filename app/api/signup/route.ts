export async function POST(req: Request,res: Response){
    const reqBody = await req.json();
    const {email,password,username} = reqBody;

    const result = await fetch('https://sihdashboardapi-chaitanyakanhar2004.b4a.run/register/',{
        method: 'POST',
        body: JSON.stringify({email,password,username}),
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await result.json();

    return new Response(JSON.stringify(data));
}