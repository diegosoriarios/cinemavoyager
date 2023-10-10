import apple from "../../assets/apple.webp";
import apple_tv from "../../assets/apple_tv.webp";
import curiosity from "../../assets/curiosity.webp";
import disney from "../../assets/disney.webp";
import google from "../../assets/google.webp";
import hbo from "../../assets/hbo.webp";
import meo from "../../assets/meo.webp";
import mubi from "../../assets/mubi.webp";
import netflix from "../../assets/netflix.webp";
import prime from "../../assets/prime.webp";
import rakuten from "../../assets/rakuten.webp";
import youtube from "../../assets/youtube.webp";
import youtube_premium from "../../assets/youtube_premium.webp";

const streamings = {
  apple,
  apple_tv,
  curiosity,
  disney,
  google,
  hbo,
  meo,
  mubi,
  netflix,
  prime,
  rakuten,
  youtube,
  youtube_premium
}


export const getStreamingIcons = (name: string) => streamings[name];