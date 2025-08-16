import AlertForm from '../components/AlertForm';
import AlertsList from '../components/AlertsList';

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <AlertForm />
      <AlertsList />
    </div>
  );
}