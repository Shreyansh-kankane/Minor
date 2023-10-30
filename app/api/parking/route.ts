export async function POST(req: Request,res: Response){
    const reqBody = await req.json()
    const parking_id = reqBody.parking_id

    const result = await fetch('https://sihdashboardapi-chaitanyakanhar2004.b4a.run/parkingdet',{
        method: 'POST',
        body: JSON.stringify({parking_id: parking_id}),
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await result.json();

    return new Response(JSON.stringify({parkingInfo:data}));
}