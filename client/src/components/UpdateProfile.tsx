import { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import { useAuth } from "../contexts/AuthContext";

export default function UpdateProfile() {
    const [isLoading, setIsLoading] = useState(false);
    const authContext = useAuth();
    const [image, setImage] = useState<string | null>(null);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
            return;
        }

        const leitor = new FileReader();
        leitor.onload = () => {
            const imageDataUrl = leitor.result as string;
            console.log(imageDataUrl);
        };
        leitor.readAsDataURL(file);

        try {
            setIsLoading(true);
            await UserService.update({ image: file });
        } catch (error) {
            console.error("Error updating profile image:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setImage(authContext.user?.image || null);
    }, [authContext.user?.image]);

    return (
        <>
            <div>
                <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleChange} />
            </div>
            <div>{isLoading ? "Updating..." : "Update Profile"}</div>
            <div>
                {image && <img src={image} alt="Profile" />}
            </div>
        </>);
}