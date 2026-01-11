import { supabase } from './supabaseClient'

export const masjidService = {
  // Get semua masjid
  async getAllMasjid() {
    const { data, error } = await supabase
      .from('masjid')
      .select('*')
      .order('nama', { ascending: true })
    
    if (error) {
      console.error('Error fetching masjid:', error)
      throw error
    }
    return data
  },

  // Get masjid by ID
  async getMasjidById(id) {
    const { data, error } = await supabase
      .from('masjid')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching masjid:', error)
      throw error
    }
    return data
  },

  // Get masjid by kategori
  async getMasjidByKategori(kategori) {
    const { data, error } = await supabase
      .from('masjid')
      .select('*')
      .eq('kategori', kategori)
    
    if (error) {
      console.error('Error fetching masjid:', error)
      throw error
    }
    return data
  },

  // Search masjid
  async searchMasjid(query) {
    const { data, error } = await supabase
      .from('masjid')
      .select('*')
      .ilike('nama', `%${query}%`)
    
    if (error) {
      console.error('Error searching masjid:', error)
      throw error
    }
    return data
  }
}