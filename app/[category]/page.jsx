import Image from 'next/image'
import pb from 'pb'
import Link from 'next/link';

const imageLoader = ({ src, width, quality }) => {
  return `https://wsrv.nl/?url=${src}&w={width}&h={height}&q=${quality || 80}`;
};
export const revalidate = 3; 

async function getWallpapers(name, page) {
  const wallpapers = await pb.records.getList('wallpapers', page || 1 , 10 /* batch size */, {
    filter: `categories.name = "${name}"`,
    sort: '-created',
});
  return wallpapers;
}

export default async function Page({ imageLoader, params, searchParams }) {

  const wallpapers = await getWallpapers(params.category, searchParams.page)
  console.log(wallpapers)
  const pages = []
  for (let i = 0; i < wallpapers.totalPages; i++) {
    pages.push(i+1)
  }
  return (
    <div className="px-2 py-3">
      <div className="">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {
        wallpapers.items.map(wallpaper => {
          const img = `https://pocketbase.akashdeep000.repl.co/api/files/${wallpaper.collectionId}/${wallpaper.id}/${wallpaper.image}`
          //console.log(img)
          return(
          <div className="rounded overflow-hidden bg-white shadow grid content-between p-2">
        
          <Image
          className="rounded mb-2"
              loader={imageLoader}
              src={img}
              alt={wallpaper.title}
              width={720}
              height={1080}
          /> 
          <a download className="" href={img}>
<button className="w-full p-2 bg-gray-800 text-white rounded">
Download
</button>
          </a>
          </div>
        
          )
        })
      }
      </div>
      
      <div className="w-fit text-center mx-auto my-0 mt-5 p-2 rounded text-gray-800 bg-white text-lg font-ubuntu shadow flex gap-2">
      {pages.length > 1 &&
      
        pages.map(page => {
          return (
          <Link href={`?page=${page}`}>
          <button className={`${wallpapers.page === page ? "bg-gray-800 text-white" : "text-gray-800 bg-gray-100"} px-3.5 py-1.5 rounded`}>
          {page}
          </button>
          </Link>
          )
        })
      }
      </div>
      
      </div>
    </div>
    )
}