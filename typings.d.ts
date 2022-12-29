type Item = { location: string; distance: string; img: string };

type Data = {
  title: string;
  items: Item[];
  urlPrefix: string;
};

interface Explore {
  resExplore: {
    title: string;
    items: Item[];
    urlPrefix: string;
  };
}

interface Live {
  resLive: {
    title: string;
    items: Item[];
    urlPrefix: string;
  };
}

interface Discover {
  resDiscover: {
    title: string;
    items: Item[];
    urlPrefix: string;
  };
}
