"use client";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchInput = () => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [input, setInput] = useState<string>(searchParams.get("search") || "");

	const handleChange = (value: string) => {
		setInput(value);

		handleSearch(value);
	};

	const handleSearch = useDebouncedCallback((value: string) => {
		const params = new URLSearchParams(searchParams);

		if (value) {
			params.set("search", value);
		} else {
			params.delete("search");
		}

		router.replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<Field className="gap-2.5">
			<FieldLabel htmlFor="inline-start-input">Search</FieldLabel>
			<InputGroup className="bg-white">
				<InputGroupInput
					id="inline-start-input"
					placeholder="Search..."
					value={input}
					name="search"
					type="text"
					onChange={(e) => handleChange(e.target.value)}
				/>
				<InputGroupAddon align="inline-start">
					<SearchIcon className="text-muted-foreground" />
				</InputGroupAddon>
			</InputGroup>
			<FieldDescription>Search any blog</FieldDescription>
		</Field>
	);
};

export default SearchInput;
