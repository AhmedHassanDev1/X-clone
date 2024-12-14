export let displayFormTitle=(step:number,email?:string) =>{
    switch (step) {
     case 0:
       return <div className=" select-none">
                <h1 className=" text-white text-2xl font-medium ">Create your account</h1>
                <h6 className=""></h6>
              </div>
    
    
    case 1 :
       return <div className=" select-none">
                <h1 className="text-white text-2xl font-medium">You'll need a password</h1>
               <h6 className="text-sm text-zinc-500">make sure it's 8 characters or more</h6>
             </div>
    }
 }