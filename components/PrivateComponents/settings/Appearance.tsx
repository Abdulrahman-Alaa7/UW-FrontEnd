"use client";
import React from "react";
import { Button, buttonVariants } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Label } from "../../ui/label";
import LangMenu from "../../../app/utils/LangMenu";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "../../../lib/utils";
import { useTheme } from "next-themes";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";

type Props = {};

const appearanceFormSchema = z.object({
  theme: z.string().optional(),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const Appearance = (props: Props) => {
  const { theme, setTheme } = useTheme();

  // This can come from your database or API.
  const defaultValues: Partial<AppearanceFormValues> = {
    theme: `${theme}`,
  };

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });

  function onSubmit(data: AppearanceFormValues) {
    setTheme(`${data.theme}`);
  }

  return (
    <Card className="fadeRight">
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the appearance of the app. Automatically switch between day
          and night themes. Set your preferred language.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex justify-between items-center border px-4 py-2 rounded-md">
          <Label>Language</Label>
          <LangMenu settings={true} />
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Theme</FormLabel>
                    <FormDescription>
                      Select the theme for the dashboard.
                    </FormDescription>
                    <FormMessage />
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid sm:grid-cols-2 lg:grid-cols-3  grid-cols-1 gap-8 pt-2"
                    >
                      <FormItem>
                        <FormLabel
                          className={`[&:has([data-state=checked])>div]:border-primary cursor-pointer`}
                        >
                          <FormControl>
                            <RadioGroupItem value="light" className="sr-only" />
                          </FormControl>
                          <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent ">
                            <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                              </div>
                              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                              </div>
                            </div>
                          </div>
                          <span className="block w-full p-2 text-center font-normal">
                            Light
                          </span>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel
                          className={`[&:has([data-state=checked])>div]:border-primary cursor-pointer`}
                        >
                          <FormControl>
                            <RadioGroupItem value="dark" className="sr-only" />
                          </FormControl>
                          <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                              <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                              </div>
                              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-slate-400" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                              </div>
                            </div>
                          </div>
                          <span className="block w-full p-2 text-center font-normal">
                            Dark
                          </span>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary cursor-pointer">
                          <FormControl>
                            <RadioGroupItem
                              value="system"
                              className="sr-only"
                            />
                          </FormControl>
                          <div className="items-center rounded-md border-2 border-muted bg-popover p-1 dark:hover:bg-accent dark:hover:text-accent-foreground hover:border-accent">
                            <div className="space-y-2 rounded-sm bg-[#ecedef] dark:bg-slate-950 p-2">
                              <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                              </div>
                              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                              </div>
                            </div>
                          </div>
                          <span className="block w-full p-2 text-center font-normal">
                            System
                          </span>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={`flex justify-center items-center mx-auto`}
              >
                Update preferences
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Appearance;
