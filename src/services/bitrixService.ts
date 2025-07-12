// Bitrix24 configuration
const BITRIX_CONFIG = {
  domain: 'metal.bitrix24.kz',
  userId: '1',
  webhook: 'wrq55a2ynzo4dzlx'
};

const BITRIX_URL = `https://${BITRIX_CONFIG.domain}/rest/${BITRIX_CONFIG.userId}/${BITRIX_CONFIG.webhook}`;

interface FormData {
  name: string;
  phone: string;
  comment?: string;
  formType: string;
  source: string;
  productData?: {
    productName?: string;
    quantity?: number;
    totalPrice?: number;
    category?: string;
    size?: string;
    branch?: string;
  };
}

interface ClientInfo {
  ip: string;
  userAgent: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

// Get client information
const getClientInfo = (): ClientInfo => {
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    ip: '', // Will be filled by server
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    utmSource: urlParams.get('utm_source') || '',
    utmMedium: urlParams.get('utm_medium') || '',
    utmCampaign: urlParams.get('utm_campaign') || '',
    utmTerm: urlParams.get('utm_term') || '',
    utmContent: urlParams.get('utm_content') || ''
  };
};

// Format phone number
const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11 && cleaned.startsWith('7')) {
    return `+${cleaned}`;
  } else if (cleaned.length === 10) {
    return `+7${cleaned}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('8')) {
    return `+7${cleaned.substring(1)}`;
  }
  
  return `+7${cleaned}`;
};

// Generate unique client ID
const getClientId = (): string => {
  let clientId = localStorage.getItem('clientId');
  if (!clientId) {
    clientId = 'client_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('clientId', clientId);
  }
  return clientId;
};

// Check for existing lead
const checkExistingLead = async (phone: string): Promise<any> => {
  const formattedPhone = formatPhone(phone);
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - 1);
  
  const queryData = new URLSearchParams({
    'filter[>DATE_CREATE]': dateFrom.toISOString().split('T')[0],
    'filter[PHONE]': formattedPhone,
    'select[]': 'ID',
    'select[]': 'TITLE',
    'select[]': 'NAME',
    'select[]': 'COMMENTS',
    'select[]': 'STATUS_ID'
  });

  try {
    const response = await fetch(`${BITRIX_URL}/crm.lead.list/?${queryData}`);
    const result = await response.json();
    
    if (result.result && result.result.length > 0) {
      return result.result[0];
    }
    return null;
  } catch (error) {
    console.error('Error checking existing lead:', error);
    return null;
  }
};

// Create new lead
const createLead = async (formData: FormData, clientInfo: ClientInfo): Promise<any> => {
  const clientId = getClientId();
  const formattedPhone = formatPhone(formData.phone);
  
  // Determine source based on domain
  const domain = window.location.hostname;
  let sourceId = 'WEB';
  
  switch (domain) {
    case 'atlantsnabcity.kz':
      sourceId = 'WEB';
      break;
    case 'atlantsnab.kz':
      sourceId = 'WEB';
      break;
    default:
      sourceId = 'WEB';
  }

  // Build comments with all available data
  let comments = `Заявка с сайта: ${formData.source}\n`;
  comments += `Тип формы: ${formData.formType}\n`;
  comments += `Телефон: ${formattedPhone}\n`;
  
  if (formData.comment) {
    comments += `Комментарий: ${formData.comment}\n`;
  }
  
  if (formData.productData) {
    comments += `\nДанные из калькулятора:\n`;
    if (formData.productData.productName) comments += `Товар: ${formData.productData.productName}\n`;
    if (formData.productData.category) comments += `Категория: ${formData.productData.category}\n`;
    if (formData.productData.size) comments += `Размер: ${formData.productData.size}\n`;
    if (formData.productData.quantity) comments += `Количество: ${formData.productData.quantity} шт.\n`;
    if (formData.productData.totalPrice) comments += `Общая стоимость: ${formData.productData.totalPrice} ₸\n`;
    if (formData.productData.branch) comments += `Филиал: ${formData.productData.branch}\n`;
  }
  
  comments += `\nТехническая информация:\n`;
  comments += `Client ID: ${clientId}\n`;
  comments += `Referrer: ${clientInfo.referrer}\n`;
  comments += `User Agent: ${clientInfo.userAgent}\n`;
  
  if (clientInfo.utmSource) comments += `UTM Source: ${clientInfo.utmSource}\n`;
  if (clientInfo.utmMedium) comments += `UTM Medium: ${clientInfo.utmMedium}\n`;
  if (clientInfo.utmCampaign) comments += `UTM Campaign: ${clientInfo.utmCampaign}\n`;
  if (clientInfo.utmTerm) comments += `UTM Term: ${clientInfo.utmTerm}\n`;

  const leadData = new URLSearchParams({
    'fields[TITLE]': `Заявка с сайта: ${window.location.hostname}`,
    'fields[NAME]': formData.name,
    'fields[SOURCE_ID]': sourceId,
    'fields[STATUS_DESCRIPTION]': clientInfo.referrer,
    'fields[ASSIGNED_BY_ID]': '1',
    'fields[COMMENTS]': comments,
    'fields[OPENED]': 'Y',
    'fields[PHONE][0][VALUE]': formattedPhone,
    'fields[PHONE][0][VALUE_TYPE]': 'WORK',
    'fields[UTM_SOURCE]': clientInfo.utmSource || '',
    'fields[UTM_MEDIUM]': clientInfo.utmMedium || '',
    'fields[UTM_CAMPAIGN]': clientInfo.utmCampaign || '',
    'fields[UTM_TERM]': clientInfo.utmTerm || '',
    'fields[UTM_CONTENT]': clientInfo.utmContent || '',
    'params[REGISTER_SONET_EVENT]': 'Y'
  });

  try {
    const response = await fetch(`${BITRIX_URL}/crm.lead.add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: leadData
    });

    const result = await response.json();
    
    if (result.result) {
      return { success: true, leadId: result.result, action: 'created' };
    } else {
      throw new Error(result.error_description || 'Failed to create lead');
    }
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
};

// Update existing lead
const updateLead = async (leadId: string, formData: FormData, clientInfo: ClientInfo): Promise<any> => {
  const clientId = getClientId();
  
  let comments = `\n\nПОВТОРНАЯ ЗАЯВКА от: ${formData.name}\n`;
  comments += `Тип формы: ${formData.formType}\n`;
  comments += `Телефон: ${formatPhone(formData.phone)}\n`;
  
  if (formData.comment) {
    comments += `Комментарий: ${formData.comment}\n`;
  }
  
  if (formData.productData) {
    comments += `\nДанные из калькулятора:\n`;
    if (formData.productData.productName) comments += `Товар: ${formData.productData.productName}\n`;
    if (formData.productData.category) comments += `Категория: ${formData.productData.category}\n`;
    if (formData.productData.size) comments += `Размер: ${formData.productData.size}\n`;
    if (formData.productData.quantity) comments += `Количество: ${formData.productData.quantity} шт.\n`;
    if (formData.productData.totalPrice) comments += `Общая стоимость: ${formData.productData.totalPrice} ₸\n`;
    if (formData.productData.branch) comments += `Филиал: ${formData.productData.branch}\n`;
  }
  
  comments += `Client ID: ${clientId}\n`;
  comments += `Время: ${new Date().toLocaleString('ru-RU')}\n`;

  const updateData = new URLSearchParams({
    'id': leadId,
    'fields[TITLE]': `ПОВТОР: Заявка с сайта: ${window.location.hostname}`,
    'fields[COMMENTS]': comments,
    'params[REGISTER_SONET_EVENT]': 'Y'
  });

  try {
    const response = await fetch(`${BITRIX_URL}/crm.lead.update/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: updateData
    });

    const result = await response.json();
    
    if (result.result) {
      return { success: true, leadId: leadId, action: 'updated' };
    } else {
      throw new Error(result.error_description || 'Failed to update lead');
    }
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
};

// Add comment to timeline
const addTimelineComment = async (leadId: string, comment: string): Promise<void> => {
  const commentData = new URLSearchParams({
    'fields[ENTITY_ID]': leadId,
    'fields[AUTHOR_ID]': '1',
    'fields[ENTITY_TYPE]': 'lead',
    'fields[COMMENT]': comment
  });

  try {
    await fetch(`${BITRIX_URL}/crm.timeline.comment.add/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: commentData
    });
  } catch (error) {
    console.error('Error adding timeline comment:', error);
  }
};

// Main submit function
export const submitForm = async (formData: FormData): Promise<any> => {
  try {
    const clientInfo = getClientInfo();
    
    // Check for existing lead
    const existingLead = await checkExistingLead(formData.phone);
    
    let result;
    
    if (existingLead) {
      // Update existing lead
      result = await updateLead(existingLead.ID, formData, clientInfo);
      
      // Add timeline comment
      const timelineComment = `Повторная заявка через форму: ${formData.formType}`;
      await addTimelineComment(existingLead.ID, timelineComment);
    } else {
      // Create new lead
      result = await createLead(formData, clientInfo);
      
      // Add timeline comment for new lead
      const timelineComment = `Новая заявка через форму: ${formData.formType}`;
      await addTimelineComment(result.leadId, timelineComment);
    }
    
    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
        'value': formData.productData?.totalPrice || 0,
        'currency': 'KZT'
      });
    }
    
    return result;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};