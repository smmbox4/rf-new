import { loadPriceData } from './csvLoader';

// Курс рубля к тенге
export const EXCHANGE_RATE = 5.8;

export interface PriceItem {
  stockTons: number;
  weightPerPiece: number;
  price1to5: number;
  price5to15: number;
  priceOver15: number;
  branch: string;
  name: string;
  size: string;
  length: string;
  gost: string;
  category: string;
  lengthValue: number;
}

// Глобальная переменная для хранения данных
let priceDataCache: PriceItem[] = [];
let isDataLoaded = false;

// Функция для инициализации данных
export const initializePriceData = async (): Promise<void> => {
  if (!isDataLoaded) {
    priceDataCache = await loadPriceData();
    isDataLoaded = true;
  }
};

// Функция для получения всех данных
export const getPriceData = async (): Promise<PriceItem[]> => {
  if (!isDataLoaded) {
    await initializePriceData();
  }
  return priceDataCache;
};

// Функция для получения цены в зависимости от объема
export const getPriceByVolume = (item: PriceItem, tons: number): number => {
  if (tons >= 15) return item.priceOver15;
  if (tons >= 5) return item.price5to15;
  return item.price1to5;
};

// Функция для конвертации рублей в тенге
export const convertToTenge = (rubles: number): number => {
  return rubles * EXCHANGE_RATE;
};

// Функция для получения уникальных категорий
export const getCategories = async (): Promise<string[]> => {
  const data = await getPriceData();
  return [...new Set(data.map(item => item.category))];
};

// Функция для получения уникальных филиалов
export const getBranches = async (): Promise<string[]> => {
  const data = await getPriceData();
  return [...new Set(data.map(item => item.branch))].sort();
};

// Функция для получения уникальных марок стали
export const getSteelGrades = async (): Promise<string[]> => {
  const data = await getPriceData();
  const grades = new Set<string>();
  
  data.forEach(item => {
    // Извлекаем марку стали из названия товара
    const name = item.name.toLowerCase();
    if (name.includes('ст20')) grades.add('Ст20');
    if (name.includes('ст40х')) grades.add('Ст40Х');
    if (name.includes('ст45')) grades.add('Ст45');
    if (name.includes('ст09г2с')) grades.add('Ст09Г2С');
    if (name.includes('ст3')) grades.add('Ст3');
    if (name.includes('ст35')) grades.add('Ст35');
    if (name.includes('ст40')) grades.add('Ст40');
  });
  
  return Array.from(grades).sort();
};

// Функция для получения товаров по категории
export const getItemsByCategory = async (category: string): Promise<PriceItem[]> => {
  const data = await getPriceData();
  return data.filter(item => item.category === category);
};

// Функция для поиска товаров
export const searchItems = async (query: string): Promise<PriceItem[]> => {
  const data = await getPriceData();
  const lowerQuery = query.toLowerCase();
  return data.filter(item => 
    item.name.toLowerCase().includes(lowerQuery) ||
    item.size.toLowerCase().includes(lowerQuery) ||
    item.category.toLowerCase().includes(lowerQuery) ||
    item.branch.toLowerCase().includes(lowerQuery) ||
    item.gost.toLowerCase().includes(lowerQuery)
  );
};

// Функция для получения размеров по категории
export const getSizesByCategory = async (category: string): Promise<string[]> => {
  const items = await getItemsByCategory(category);
  return [...new Set(items.map(item => item.size))].sort();
};

// Функция для фильтрации по размеру
export const getItemsBySize = async (category: string, size: string): Promise<PriceItem[]> => {
  const data = await getPriceData();
  return data.filter(item => item.category === category && item.size === size);
};

// Функция для фильтрации по филиалу
export const getItemsByBranch = async (branch: string): Promise<PriceItem[]> => {
  const data = await getPriceData();
  return data.filter(item => item.branch === branch);
};

// Функция для фильтрации по марке стали
export const getItemsBySteelGrade = async (grade: string): Promise<PriceItem[]> => {
  const data = await getPriceData();
  return data.filter(item => item.name.toLowerCase().includes(grade.toLowerCase()));
};

// Комплексная фильтрация
export const getFilteredItems = async (filters: {
  category?: string;
  branch?: string;
  steelGrade?: string;
  size?: string;
  searchQuery?: string;
}): Promise<PriceItem[]> => {
  let data = await getPriceData();
  
  if (filters.searchQuery) {
    const lowerQuery = filters.searchQuery.toLowerCase();
    data = data.filter(item => 
      item.name.toLowerCase().includes(lowerQuery) ||
      item.size.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery) ||
      item.branch.toLowerCase().includes(lowerQuery) ||
      item.gost.toLowerCase().includes(lowerQuery)
    );
  }
  
  if (filters.category) {
    data = data.filter(item => item.category === filters.category);
  }
  
  if (filters.branch) {
    data = data.filter(item => item.branch === filters.branch);
  }
  
  if (filters.steelGrade) {
    data = data.filter(item => item.name.toLowerCase().includes(filters.steelGrade.toLowerCase()));
  }
  
  if (filters.size) {
    data = data.filter(item => item.size === filters.size);
  }
  
  return data;
};