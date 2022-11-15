import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface IPhoto {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

function fetchPhotos(): Promise<IPhoto[]> {
  return fetch("https://jsonplaceholder.typicode.com/photos").then((res) =>
    res.json()
  );
}

function Photos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) return <div>Error: {error?.message}</div>;

  return (
    <div className="img-container">
      {data?.map((item) => (
        <img key={item.id} src={item.url} />
      ))}
    </div>
  );
}

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Photos />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
