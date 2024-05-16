import KPI from "@/components/Visualization/KPI";
import LineChart from "@/components/Visualization/LineChart";

export const Card = ({ cardInfos }) => {
  const cardIsEmpty = Object.keys(cardInfos).length === 0;

  if (cardIsEmpty) {
    return <div />;
  }

  return (
    <div className="bg-[#F6F8F9F2] p-5 pt-4">
      <LineChart
        cardInfos={cardInfos}
        color={cardInfos?.color}
        style={{ height: "123px" }}
      />
      <div className="border-b-[1px] border-[#979DB2] border-dashed mx-5" />
      <div className="flex flex-col gap-1 mt-8">
        <KPI.Primary kpiInfo={cardInfos.kpi} />
        <KPI.Percentage kpiInfo={cardInfos.kpiPercentage} />
      </div>
    </div>
  );
};
