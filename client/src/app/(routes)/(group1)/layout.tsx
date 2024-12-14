import MaxWidthWrapper from "@/components/maxWidthWrapper";

function layout({ children }: { children: React.ReactNode }) {

   return (
  
       <MaxWidthWrapper>
       {children}
       </MaxWidthWrapper>
    
  )
}

export default layout