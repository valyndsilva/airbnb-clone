const fetchDiscover = async () => {
  const discoverResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/discover`
  );
  const discoverData = await discoverResponse.json();
  // console.log(discoverData);
  return discoverData;
};
export default fetchDiscover;
