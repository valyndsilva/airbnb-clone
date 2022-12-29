const fetchLive = async () => {
  const liveResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/live`
  );
  const liveData = await liveResponse.json();
  // console.log(liveData);
  return liveData;
};
export default fetchLive;
