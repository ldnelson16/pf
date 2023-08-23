import { useRouter } from 'next/router';
import * as playerdata from '../../data/recruitingdata.json';

const PlayerDetailPage = () => {
  const router = useRouter();
  const { playerId, dateIndex, year } = router.query;
  console.log(playerId);
  console.log(dateIndex);
  console.log(year);
  const name = playerdata["Class"+String(year)]["players"][playerId]["name"];

  // Fetch player data based on playerId
  // ...

  return (
    <div>
      <h1>{name}</h1>
      {/* Display other player details */}
    </div>
  );
};

export default PlayerDetailPage;