export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: number;
          name: string;
          price: number;
          brand: string | null;
          category: string | null;
          image: string | null;
          description: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: never;
          name: string;
          price?: number;
          brand?: string | null;
          category?: string | null;
          image?: string | null;
          description?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: never;
          name?: string;
          price?: number;
          brand?: string | null;
          category?: string | null;
          image?: string | null;
          description?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};