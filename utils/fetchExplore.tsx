const fetchExplore = async () => {
  const exploreResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/explore`
  );
  const exploreData = await exploreResponse.json();
  // console.log(exploreData);
  return exploreData;
};
export default fetchExplore;
