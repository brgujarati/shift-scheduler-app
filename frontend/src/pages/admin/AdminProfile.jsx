import ProfileReview from "../../components/profile/ProfileReview";
import ProfileEditor from "../../components/profile/ProfileEditor";
import { useProfileForm } from "../../hooks/profile/useProfileForm";

export default function AdminProfile() {
  const { showReview, loading, formData, handlers, user } = useProfileForm();

  return (
    <main className="flex-1 p-6">
      <div className="w-full flex justify-start">
        <div className="max-w-xl w-full">
          {showReview ? (
            <ProfileReview
              formData={formData}
              loading={loading}
              handlers={handlers}
              user={user}
            />
          ) : (
            <ProfileEditor formData={formData} handlers={handlers} />
          )}
        </div>
      </div>
    </main>
  );
}
