export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      api_testing: {
        Row: {
          created_at: string;
          id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
        };
        Update: {
          created_at?: string;
          id?: number;
        };
        Relationships: [];
      };
      Category: {
        Row: {
          budget: number | null;
          id: number;
          name: string;
          user_id: string;
        };
        Insert: {
          budget?: number | null;
          id?: number;
          name: string;
          user_id: string;
        };
        Update: {
          budget?: number | null;
          id?: number;
          name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Category_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      Expense: {
        Row: {
          amount: number;
          category_id: number;
          date: string;
          description: string | null;
          id: number;
          user_id: string;
        };
        Insert: {
          amount: number;
          category_id: number;
          date: string;
          description?: string | null;
          id?: number;
          user_id: string;
        };
        Update: {
          amount?: number;
          category_id?: number;
          date?: string;
          description?: string | null;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Expense_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "Category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Expense_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
