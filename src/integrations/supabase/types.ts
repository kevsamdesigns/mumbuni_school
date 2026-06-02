export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      admin_invites: {
        Row: {
          id: string;
          email: string;
          invited_by: string | null;
          created_at: string;
          consumed_at: string | null;
          consumed_by: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          invited_by?: string | null;
          created_at?: string;
          consumed_at?: string | null;
          consumed_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["admin_invites"]["Insert"]>;
      };
      content_blocks: {
        Row: {
          id: string;
          page: string;
          section: string;
          kind: string;
          value: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          page: string;
          section: string;
          kind?: string;
          value?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["content_blocks"]["Insert"]>;
      };
      media_items: {
        Row: {
          id: string;
          collection: string;
          storage_path: string;
          alt: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          collection: string;
          storage_path: string;
          alt?: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["media_items"]["Insert"]>;
      };
      profiles: {
        Row: {
          user_id: string;
          role: "student" | "teacher" | "admin";
          admission_no: string | null;
          full_name: string | null;
          form: string | null;
          stream: string | null;
          gender: string | null;
          parent_name: string | null;
          parent_phone: string | null;
          kcpe_index: string | null;
          kcpe_assessment: string | null;
          staff_no: string | null;
          national_id: string | null;
          tsc_no: string | null;
          date_of_birth: string | null;
          phone: string | null;
          email: string | null;
          department: string | null;
          subject1: string | null;
          subject2: string | null;
          qualification: string | null;
          employment_type: string | null;
          date_joined: string | null;
          address: string | null;
          emergency_contact: string | null;
          passport_photo: string | null;
          approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          role: "student" | "teacher" | "admin";
          admission_no?: string | null;
          full_name?: string | null;
          form?: string | null;
          stream?: string | null;
          gender?: string | null;
          parent_name?: string | null;
          parent_phone?: string | null;
          kcpe_index?: string | null;
          kcpe_assessment?: string | null;
          staff_no?: string | null;
          national_id?: string | null;
          tsc_no?: string | null;
          date_of_birth?: string | null;
          phone?: string | null;
          email?: string | null;
          department?: string | null;
          subject1?: string | null;
          subject2?: string | null;
          qualification?: string | null;
          employment_type?: string | null;
          date_joined?: string | null;
          address?: string | null;
          emergency_contact?: string | null;
          passport_photo?: string | null;
          approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      results: {
        Row: {
          id: string;
          admission_no: string;
          student_name: string | null;
          term: string;
          year: number;
          subject: string;
          marks: number;
          grade: string | null;
          remarks: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          admission_no: string;
          student_name?: string | null;
          term: string;
          year: number;
          subject: string;
          marks: number;
          grade?: string | null;
          remarks?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["results"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      claim_admin_invite: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<TableName extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][TableName]["Row"];
