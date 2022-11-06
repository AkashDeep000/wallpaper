import Image from 'next/image'
import pb from 'pb'
import Link from 'next/link';

const imageLoader = ({ src, width, quality }) => {
  return `https://wsrv.nl/?url=${src}&w={width}&h={height}&q=${quality || 80}`;
};
export const revalidate = 3; 
async function getCategories(page) {
  const categories = await pb.records.getList('categories', page || 1, 20 /* batch size */, {
    sort: '-created',
});
  return categories;
}

export default async function Home({imageLoader, searchParams}) {
  const categories = await getCategories(searchParams.page)
  console.log(categories)
  const pages = []
  for (let i = 0; i < categories.totalPages; i++) {
    pages.push(i+1)
  }
  
  return (
    <div className="px-2 py-3">
      <div className="">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {
        categories.items.map(category => {
          const img = `https://pocketbase.akashdeep000.repl.co/api/files/${category.collectionId}/${category.id}/${category.thumbnail}`
          console.log(img)
          return(
            <Link href={`/${category.name}`}>
          <div className="rounded overflow-hidden bg-white shadow grid content-between">
          {category.thumbnail ?
          <Image
              loader={imageLoader}
              src={img}
              alt={category.title}
              width={1080}
              height={720}
          /> :
          <Image
              src="/img-ph.jpg"
              alt={category.title}
              width={1080}
              height={720}
          />
          }
          <p className="px-2 py-3 ">
          {category.title || category.name}
          </p>
          </div>
          </Link>
          )
        })
      }
      </div>
            <div className="w-fit text-center mx-auto my-0 mt-5 p-2 rounded text-gray-800 bg-white text-lg font-ubuntu shadow flex gap-2">
            {pages.length > 1 &&
      
        pages.map(page => {
          return (
          <Link href={`?page=${page}`}>
          <button className={`${categories.page === page ? "bg-gray-800 text-white" : "text-gray-800 bg-gray-100"} px-3.5 py-1.5 rounded`}>
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
