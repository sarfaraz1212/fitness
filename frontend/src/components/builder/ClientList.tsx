import React, { useState, useEffect, useRef } from "react";
import { Search, User, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchClients } from "@/lib/React-query/queryFunction";
import AppPagination from "@/components/common/AppPagination";
import Spinner from "@/components/ui/Spinner";

interface Client {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface ClientListProps {
  clientSearch: string;
  setClientSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedClient: Client | null;
  setSelectedClient: React.Dispatch<React.SetStateAction<Client | null>>;
  setCurrentStep: (step: any) => void;
}

const ClientList: React.FC<ClientListProps> = ({
  clientSearch,
  setClientSearch,
  selectedClient,
  setSelectedClient,
  setCurrentStep,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [debouncedSearchQuery] = useDebounce(clientSearch, 300);

  const { data: clientsData, isFetching, error } = useQuery<any>({
    queryKey: ["clients", page, limit, debouncedSearchQuery],
    queryFn: () =>
      fetchClients({
        page,
        limit,
        search: debouncedSearchQuery,
      }),
    placeholderData: keepPreviousData,
  });

  function handleSelect(client: Client) {
    if (selectedClient?.id === client.id) {
      setSelectedClient(null);
      return;
    }
    setSelectedClient(client);
  }

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery]);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, [debouncedSearchQuery]);

  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading clients</div>;
  }

  return (
    <div className="space-y-4 slide-up">
      <div className="text-center mb-6">
        <User className="w-12 h-12 text-primary mx-auto mb-3" />
        <h2 className="text-lg font-semibold">Select Client</h2>
        <p className="text-sm text-muted-foreground">Choose which client this plan is for</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          ref={searchInputRef}
          placeholder="Search clients..."
          value={clientSearch}
          onChange={(e) => setClientSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="relative min-h-[420px] space-y-2">
        {isFetching && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <Spinner className="h-6 w-6 text-primary" />
          </div>
        )}

        {!isFetching && clientsData?.clients?.length === 0 && (
          <div className="flex items-center justify-center h-[420px] text-muted-foreground">No clients found</div>
        )}

        {clientsData?.clients?.map((client: Client) => (
          <button
            key={client.id}
            onClick={() => handleSelect(client)}
            className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${selectedClient?.id === client.id
              ? "bg-primary/10 border-2 border-primary"
              : "bg-card border-2 border-transparent hover:border-border"
              }`}
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
              {client.avatar}
            </div>

            <div className="text-left flex-1">
              <p className="font-medium text-foreground">{client.name}</p>
              <p className="text-sm text-muted-foreground">{client.email}</p>
            </div>

            {selectedClient?.id === client.id && <Check className="w-5 h-5 text-primary" />}
          </button>
        ))}
      </div>

      {clientsData && (
        <AppPagination
          currentPage={clientsData.currentPage}
          totalPages={clientsData.totalPages}
          onPageChange={setPage}
        />
      )}

      <Button
        className="w-full mt-4"
        disabled={!selectedClient}
        onClick={() => setCurrentStep("plans")}
      >
        Continue <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default ClientList;
