const fetchSearch = async () => {
  const searchResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search`
  );
  const searchData = await searchResponse.json();
  // console.log(searchData);
  return searchData;
};
export default fetchSearch;
