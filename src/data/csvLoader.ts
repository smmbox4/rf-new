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

// Функция для загрузки и парсинга CSV файла
export const loadPriceData = async (): Promise<PriceItem[]> => {
  try {
    const response = await fetch('/src/data/PRICE_primer4.csv');
    const csvText = await response.text();
    
    const lines = csvText.split('\n');
    const headers = lines[0].split(';').map(h => h.trim());
    
    const data: PriceItem[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = line.split(';').map(v => v.trim());
      
      if (values.length < headers.length) continue;
      
      try {
        // Определяем категорию на основе названия товара
        let category = 'Прочее';
        const name = values[6] || '';
        
        if (name.toLowerCase().includes('круг')) {
          category = 'Круг стальной';
        } else if (name.toLowerCase().includes('труба проф')) {
          category = 'Труба профильная';
        } else if (name.toLowerCase().includes('труба')) {
          category = 'Труба стальная';
        }
        
        // Извлекаем числовое значение длины
        const lengthStr = values[8] || '';
        let lengthValue = 6; // значение по умолчанию
        
        const lengthMatch = lengthStr.match(/(\d+(?:\.\d+)?)/);
        if (lengthMatch) {
          lengthValue = parseFloat(lengthMatch[1]);
        }
        
        const item: PriceItem = {
          stockTons: parseFloat(values[0]) || 0,
          weightPerPiece: parseFloat(values[1]) || 0,
          price1to5: parseFloat(values[2]) || 0,
          price5to15: parseFloat(values[3]) || 0,
          priceOver15: parseFloat(values[4]) || 0,
          branch: values[5] || '',
          name: name,
          size: values[7] || '',
          length: lengthStr,
          gost: values[9] || '',
          category: category,
          lengthValue: lengthValue
        };
        
        // Проверяем, что основные поля заполнены
        if (item.name && item.size && item.priceOver15 > 0) {
          data.push(item);
        }
      } catch (error) {
        console.warn(`Ошибка парсинга строки ${i}:`, error);
        continue;
      }
    }
    
    console.log(`Загружено ${data.length} позиций из CSV`);
    return data;
  } catch (error) {
    console.error('Ошибка загрузки CSV файла:', error);
    // Возвращаем пустой массив в случае ошибки
    return [];
  }
};