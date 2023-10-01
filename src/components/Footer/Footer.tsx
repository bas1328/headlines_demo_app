import { Fira_Code } from "next/font/google";
import styles from "./Footer.module.scss";

const inter = Fira_Code({ subsets: ["latin"] });

export default function Footer() {
  return (
    <footer className={`${styles.container} ${inter.className}`}>footer</footer>
  );
}
