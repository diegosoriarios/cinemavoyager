import type { GetServerSideProps } from "next";

// The watch list is the same as the saved/bookmarked movies, which live at
// /bookmarks. Keep the old URL working for existing links.
export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: "/bookmarks",
    permanent: false,
  },
});

export default function WatchList() {
  return null;
}
