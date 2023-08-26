import { useState, useEffect } from 'react';
import { Route, Link, Routes, useMatch } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';
import { Patient, Diagnose } from './types';
import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import DetailedPatient from './components/Patient/DetailedPatient';
import diagnoseService from './services/diagnoses';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  const match = useMatch('/patients/:id');

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnoseList = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchPatientList();
    void fetchDiagnoseList();
  }, []);

  const patient = match
    ? patients.find((patient) => patient.id === match.params.id)
    : null;

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="patients/:id"
            element={
              <DetailedPatient patient={patient} diagnoses={diagnoses} />
            }
          />
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
