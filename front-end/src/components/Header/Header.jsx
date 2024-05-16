import LogoCluster from "../../assets/images/cluster-logo.svg";
import LogoLooker from "../../assets/images/looker-logo.svg";
import { Tabs } from "./components/Tabs";

export function Header() {
  return (
    <header
      className="flex flex-wrap xs:justify-center sm:justify-between xs:gap-4
      pt-4"
    >
      <div className="flex gap-8">
        <img src={LogoCluster} alt="Cluster Logo" />
        <Tabs />
      </div>

      <div className="flex items-center gap-3">
        <span className="font-barlow font-normal text-white leading-5 text-[14px]">
          Powered by
        </span>
        <img src={LogoLooker} alt="Looker Logo" />
      </div>
    </header>
  );
}
