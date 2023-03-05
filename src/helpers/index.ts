import isUUID from 'is-uuid';

export const checkUUID = (id: string) => isUUID.v4(id);
