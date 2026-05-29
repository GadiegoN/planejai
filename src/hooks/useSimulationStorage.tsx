import type { SimulationFormData, SimulationRecord } from "../data/simulation";

const LOCAL_STORAGE_KEY = "simulation-data";

export const useSimulationStorage = () => {
  const getSavedData = () => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);

    return storage ? (JSON.parse(storage) as SimulationRecord[]) : [];
  };

  const setSavedData = (data: SimulationRecord[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID();
    const record: SimulationRecord = {
      ...formData,
      id,
      createdAt: new Date().toISOString(),
    };

    const savedData = getSavedData();

    setSavedData([...savedData, record]);

    return id;
  };

  const getFormData = (id: string) => {
    const savedData = getSavedData();
    return savedData.find((record) => record.id === id) || null;
  };

  const getAllSimulations = () => {
    return getSavedData().slice().reverse();
  };

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const savedData = getSavedData();

    const updated = savedData.map((record) =>
      record.id === id ? { ...data } : record,
    );

    setSavedData(updated);
  };

  const deleteSimulation = (id: string) => {
    const savedData = getSavedData();
    const filtered = savedData.filter((record) => record.id !== id);

    setSavedData(filtered);
  };

  return {
    saveFormData,
    getFormData,
    getAllSimulations,
    updateSimulation,
    deleteSimulation,
  };
};
