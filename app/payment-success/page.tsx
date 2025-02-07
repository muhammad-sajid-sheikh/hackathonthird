interface PaymentSuccessProps {
    searchParams: { [key: string]: string | string[] | undefined };
  }
  
  export default function PaymentSuccess({ searchParams }: PaymentSuccessProps) {
    const amount = typeof searchParams.amount === "string" ? searchParams.amount : "0"; 
  
    return (
      <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-black to-gray-600">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Thank You!</h1>
          <h2 className="text-2xl">You Successfully sent</h2>
          <div className="bg-white p-2 rounded-md text-black mt-5 text-4xl font-bold">
            ${amount}
          </div>
        </div>
      </main>
    );
  }
  