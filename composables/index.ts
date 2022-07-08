import api from '@/api/index'

export interface BaseSettingsConfig {
  web_name: string;
  web_sign: string;
  web_slogan: string;
  web_title: string;
  web_url: string;
  web_beian: string;
  web_notice: any[];
  web_mail: string;
  web_version: string;
  web_keywords: string;
  web_description: string;
  web_date: Date;
  web_tongji: string;
  web_copyright: string;
  open_comment: boolean;
  web_avatar: string;
  web_logo: string;
  web_like: number;
}

export interface ColumnItem {
  name: string,
  id: string,
  alias: string,
  type: string,
  url: string,
  subcolumns: any[]
}

export interface PersonalSettingsConfig {
  style: string;
  font: string;
  background: string;
  gray: boolean;
  auto: boolean;
}

export const useApi = () => api

/** 基本设置数据 */
export const useBaseSettings = (data?: any) => {
  return useState<BaseSettingsConfig>('baseSettings', () => data || {})
}

/** 个性化设置 */
export const usePersonalSettings = (data?: any) => {
  return useState<PersonalSettingsConfig>('personalSettings', () => data || {})
}

/** 栏目 */
export const useColumns = (data?: any) => {
  return useState<ColumnItem[]>('columns', () => data || [])
}

/** 打平的栏目 */
export const useFlatColumns = (data?: any) => {
  return useState<ColumnItem[]>('flatColumns', () => data || [])
}

