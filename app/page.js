import Image from "next/image";
import styles from "./page.module.css";
import CounsellingDetail from "./addConselling/page";
import Footer from "@/components/footer/footer";

 

export default function Home() {
  return   <div>

     {/* <CounsellingDetail></CounsellingDetail> */}

    <CounsellingDetail></CounsellingDetail>
            <Footer></Footer>
    </div>
}
