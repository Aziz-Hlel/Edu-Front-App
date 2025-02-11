import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider, QueryClient, } from 'react-query'
import { Toaster } from 'sonner';

const queryclient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')!).render(

        <QueryClientProvider client={queryclient}>
                <Toaster richColors/>

                <App />
                {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
        </QueryClientProvider>

)
