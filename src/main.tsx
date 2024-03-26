import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60,
    },
  },
})

const persister = createSyncStoragePersister({storage: window.localStorage})
ReactDOM.createRoot(document.getElementById('root')!).render(
    <PersistQueryClientProvider client={queryClient} 
    persistOptions={{ persister }}>
      <App/>
    </PersistQueryClientProvider>
)
